
// export async function getManyReportTrainingRepository(filters: Filters) {
   /*
     Filtros:
  1 - Personal Trainer
  2 - Member
  3 - Período (Data inicial e final)


   Desejo retornar:
    1 - Todas as aulas marcadas como dadas (Realized)
    2 - Todas as aulas marcadas como reposição (Reschedule)
    3 - Todas as aulas marcadas como dadas (Foul)


Exemplo:
Cenários


Direito a 4 aulas por mês

**Mês com 5 semanas**

01-12 - Realized
08-12 - Reschedule
14-12 - Realized
15-12 - Realized
22-12 - Realized
23-12 - Realized
30-12 - Realized

Relatório:
Aulas realizadas: 6
Aulas de reposição: 1
Aulas falta: 0
Saldo: 5


Mês com 4 semanas e Falta

01-01 - Realized
08-01 - Realized
15-01 - Realized
22-01 - Foul

Relatório:
Aulas realizadas: 3
Aulas de reposição: 0
Aulas falta: 1
Saldo: 4


Cálculo: aulas realizadas - aulas de reposição + aulas falta


Fevereiro

01-02 - Realized
08-02 - Realized
15-02 - Realized
22-02 - Foul
28-02 - Realized

Relatório:
Aulas realizadas: 3
Aulas de reposição: 0
Aulas falta: 1
Saldo: 4


Cálculo: aulas realizadas - aulas de reposição + aulas falta





*/
//
//   const training
//
// }