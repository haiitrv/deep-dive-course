import { NgModule } from "@angular/core";

import { CourseImageComponent } from "src/course-image/course-image.component";
import { CourseCardComponent } from "./course-card/course-card.component";
import { HighlightedDirective } from "./directives/highlighted.directive";
import { NgxUnlessDirective } from "./directives/ngx-unless.directive";
import { CoursesService } from "./services/courses.service";
import { CommonModule } from "@angular/common";
import { FilterByCategoryPipe } from "./filter-by-category.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective,
    FilterByCategoryPipe,
  ],
  exports: [CourseCardComponent, CourseImageComponent, FilterByCategoryPipe],
  providers: [CoursesService],
})
export class CoursesModule {}
