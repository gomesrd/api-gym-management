import {FastifyInstance} from "fastify";
import {
    deletePersonalTrainerHandler,
    disablePersonalTrainerHandler,
    getManyPersonalTrainersHandler,
    getUniquePersonalTrainerHandler,
    loginHandler,
    registerPersonalTrainerHandler,
    updatePersonalTrainerHandler
} from "./personalTrainer.controller";
import {$ref} from "./personalTrainer.schema";

async function personalTrainerRoutes(server: FastifyInstance) {
    server.get('', {
        preHandler: [server.authenticate, server.authorizationExclusive],
        schema: {
            tags: ['PersonalTrainer'],
            summary: 'Get all Personal Trainers',
            response: {
                200: {
                    type: 'array',
                    items: $ref('PersonalTrainersManyResponseSchema')
                },
            },
        },
    }, getManyPersonalTrainersHandler);

    server.get('/:id', {
        preHandler: [server.authenticate, server.authorizationLimited],
        schema: {
            tags: ['PersonalTrainer'],
            summary: 'Get a specific Personal Trainer',
            params: {
                id: {type: 'string'},
            },
            response: {
                200: $ref('PersonalTrainerUniqueResponseSchema')
            }
        },
    }, getUniquePersonalTrainerHandler);

    server.post('', {
        preHandler: [server.authenticate, server.authorizationExclusive],
        schema: {
            tags: ['PersonalTrainer'],
            body: $ref('createPersonalTrainerSchema'),
            summary: 'Create a new Personal Trainer',
            response: {
                201: $ref('createPersonalTrainerResponseSchema')
            }
        }
    }, registerPersonalTrainerHandler);

    server.post('/login', {
        schema: {
            tags: ['PersonalTrainer'],
            body: $ref('loginSchema'),
            summary: 'Login in the application',
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler);

    server.put('/:id', {
            preHandler: [server.authenticate, server.authorizationLimited],
            schema: {
                tags: ['PersonalTrainer'],
                summary: 'Update a specific Personal Trainer',
                params: {
                    id: {type: 'string'},
                },
                body: $ref('updatePersonalTrainerSchema'),
                response: {
                    200: $ref('updatePersonalTrainerSchema')
                }
            }
        }, updatePersonalTrainerHandler
    );

    server.put('/disable/:id', {
            preHandler: [server.authenticate, server.authorizationExclusive],
            schema: {
                tags: ['Training'],
                summary: 'Disable a specific Personal Trainer',
                params: {
                    id: {type: 'string'},
                },
                body: $ref('updatePersonalTrainerSchema'),
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            message: {type: 'string', example: ''}
                        }
                    }
                },

            }
        }, disablePersonalTrainerHandler
    );

    server.delete('/:id', {
            preHandler: [server.authenticate, server.authorizationExclusive],
            schema: {
                tags: ['PersonalTrainer'],
                summary: 'Delete a specific Personal Trainer',
                params: {
                    id: {type: 'string'},
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            message: {type: 'string', example: ''}
                        }
                    }
                }
            }
        }, deletePersonalTrainerHandler
    );
}

export default personalTrainerRoutes;