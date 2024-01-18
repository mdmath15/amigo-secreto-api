export const getTodayDate = () =>
  Intl.DateTimeFormat('pt-BR', {}).format(new Date());
