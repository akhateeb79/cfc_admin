import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitWords"
})
export class LimitWordsPipe implements PipeTransform {
  transform(value: any, limit: any): any {
    return value.length > limit
      ? value
          .split(" ")
          .slice(0, limit)
          .join(" ") + "..."
      : value;
  }
}
