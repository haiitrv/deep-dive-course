import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../model/course";

@Pipe({
  name: "filterByCategory",
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(course: Course[], category: string) {
    return course.filter((crs) => {
      return crs.category === category;
    });
  }
}
