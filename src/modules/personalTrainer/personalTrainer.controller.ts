import {FastifyReply, FastifyRequest} from "fastify";
import {
  createPersonalTrainer, deletePersonalTrainer, findUniquePersonalTrainer, findPersonalTrainerByEmail,
  findManyPersonalTrainers, updatePersonalTrainer, disablePersonalTrainer
} from "./personalTrainer.service";
import {
  CreatePersonalTrainerInput, DeletePersonalTrainer, LoginInput, PersonalTrainerId, UpdatePersonalTrainer
} from "./personalTrainer.schema";
import {invalidLoginMessage} from "./personalTrainer.mesages";
import {verifyPassword} from "../../utils/hash";
import {server} from "../../app";

export async function registerPersonalTrainerHandler(request: FastifyRequest<{
  Body: CreatePersonalTrainerInput
}>, reply: FastifyReply) {
  const body = request.body;
  try {
    const personalTrainer = await createPersonalTrainer(body);
    return reply.code(201).send(personalTrainer)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function loginHandler(request: FastifyRequest<{
  Body: LoginInput
}>, reply: FastifyReply) {
  const body = request.body;
  const personalTrainer = await findPersonalTrainerByEmail(body.email);
  if (!personalTrainer) {
    return reply.code(401).send(invalidLoginMessage())
  }
  const correctPassword = verifyPassword(
    {
      candidatePassword: body.password,
      salt: personalTrainer.salt,
      hash: personalTrainer.password
    }
  )
  if (correctPassword) {
    const {id, name, role} = personalTrainer;
    const personalTrainerData = {id, name, role};
    // const expiresIn = 60 * 120;
    const accessToken = server.jwt.sign(personalTrainerData);

    return reply.code(200).send({accessToken});
  }
  return reply.code(401).send(invalidLoginMessage());
}

export async function getUniquePersonalTrainerHandler(request: FastifyRequest<{
  Params: PersonalTrainerId;
}>) {
  return findUniquePersonalTrainer({
    ...request.params,
    user_id: request.user.id,
    user_role: request.user.role
  });
}

export async function getManyPersonalTrainersHandler(request: FastifyRequest) {
  try {
    return findManyPersonalTrainers(
      {
        user_role: request.user.role
      }
    );
  } catch (e) {
    console.log(e)
  }
}

export async function updatePersonalTrainerHandler(request: FastifyRequest<{
  Body: UpdatePersonalTrainer;
  Params: PersonalTrainerId;
}>) {
  return updatePersonalTrainer({
    ...request.body,
  }, {
    ...request.params,
    user_id: request.user.id,
    user_role: request.user.role
  });
}

export async function disablePersonalTrainerHandler(request: FastifyRequest<{
  Body: UpdatePersonalTrainer;
  Params: PersonalTrainerId;
}>) {
  return disablePersonalTrainer({
      ...request.params
    }
  );
}

export async function deletePersonalTrainerHandler(request: FastifyRequest<{
  Params: DeletePersonalTrainer;
}>, reply: FastifyReply) {
  await deletePersonalTrainer({
    ...request.params
  });
  return reply.code(200).send('');
}