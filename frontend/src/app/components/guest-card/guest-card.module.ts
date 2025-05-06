import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { GuestCardComponent } from "./guest-card.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [GuestCardComponent],
  exports:[GuestCardComponent]
})
export class GuestCardModule {}