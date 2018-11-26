import { NgModule } from '@angular/core';
import { CharactorComponent } from './charactor/charactor';
import { TreeComponent } from './tree/tree';
import { DragComponent } from './drag/drag';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [CharactorComponent,
    TreeComponent,
    DragComponent],
	imports: [IonicModule],
	exports: [CharactorComponent,
    TreeComponent,
    DragComponent]
})
export class ComponentsModule {}
