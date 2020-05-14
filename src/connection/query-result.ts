export class QueryResult {
  /**
   * 
   * @param rows array of object, object corresponds to table row, object property are table row columns  
   * @param rawResult result as returned by specific driver
   */
  constructor(public rows: any[], public rawResult: any) {
  }
}