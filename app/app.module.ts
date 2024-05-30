import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { CoursesModule } from "./courses/courses.module";
import { HighlightedDirective } from "./courses/directives/highlighted.directive";
import { NgxUnlessDirective } from "./courses/directives/ngx-unless.directive";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoursesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
