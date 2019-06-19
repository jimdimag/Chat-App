import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  msg: '';
  editMsg = false;
  editId: number;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('messages');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
 send(chatMsg: string) {
   this.itemsRef.push({ message: chatMsg });
   this.msg = '';
 }
 delete(key: string) {
   this.itemsRef.remove(key);
 }
 edit(key: string, message: string) {
  this.itemsRef.update(key, { message });
  this.editMsg = false;
 }
}
