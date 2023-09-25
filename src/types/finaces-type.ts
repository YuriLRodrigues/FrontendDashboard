export type FinanceDatasType = {
  transation: string,
  day: string,
  hour: string,
  minutes: string,
  month: string,
  year: string,
  value: number,
  id: string,
  title: string,
  store: string | null,
  payment: string |  null,
  product: string | null
}

export type FinanceType = {
  FinanceData: FinanceDatasType[]
}

export type Date = {
  date: string,
  title: string,
  valor: number
}