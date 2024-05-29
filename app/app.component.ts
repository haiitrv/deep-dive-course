import { Component, Inject, InjectionToken, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "./model/course";
import { CoursesService } from "./services/courses.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from "./config";

// function coursesServiceProvider(http: HttpClient): CoursesService {
//   return new CoursesService(http);
// }

// export const COURSES_SERVICE = new InjectionToken<CoursesService>(
//   "COURSES_SERVICE"
// );

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [
    // {
    //   // provide: COURSES_SERVICE,
    //   // useFactory: coursesServiceProvider,
    //   // deps: [HttpClient],
    //   provide: CoursesService,
    //   useClass: CoursesService,
    // },
    { provide: CONFIG_TOKEN, useFactory: () => APP_CONFIG },
  ],
})
export class AppComponent implements OnInit {
  courses$: Observable<{ payload: Course[] }>;
  courses: Course[];
  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {
    console.log(config);
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourses(course).subscribe(() => {
      console.log("Saved");
      this.coursesService.loadCourses();
    });
  }
}
