import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class CsvHelper {
  static readCsv(filePath: string): Record<string, string>[] {
    return parse(fs.readFileSync(filePath, 'utf-8'), {
      columns: true, //first row conside as headers
      skip_empty_lines: true,
      trim: true //trim spaces
    }) as Record<string, string>[];
  }
}
//record is the existing collection in the javascript, this will help you to store data kind of data that you fetching from csv file
//<string,string> means if you passing 100 as well it will be conside as string, this is kind of header and valie schema
//utf-8 - means if you have special characters/chines/japnies character in your data , consider as character
