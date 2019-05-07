import { Component, OnInit, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { IntegralUITreeView } from '@lidorsystems/integralui-web/bin/integralui/components/integralui.treeview';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild('application', { read: ViewContainerRef }) applicationRef: ViewContainerRef;
  @ViewChild('treeview') treeview: IntegralUITreeView;

  public items: Array<any>;

  private isEditActive: boolean = false;
  public editItem: any = null;
  private originalText: string = '';
  public editorFocused: boolean = false;
  public hoverItem: any = null;

  public ctrlStyle: any = {
    general: {
      normal: 'trw-add-dynamic'
    }
  }

  private itemCount: number = 1;

  constructor(private http: HttpClient) {
    this.items = [
      { text: "Item 1" }
    ];

  }

  ngOnInit() {
    this.getTreeData();
  }

  // Add/Remove ------------------------------------------------------------------------

  createNewItem() {
    this.itemCount++;

    return { text: "Item " + this.itemCount };
    
  }

  addRoot() {
    let item: any = this.createNewItem();

    this.treeview.addItem(item);
    this.showEditor(item);
  }

  addChild(parent: any) {
    let item: any = this.createNewItem();

    this.treeview.addItem(item, parent);
    this.showEditor(item);
  }

  deleteItem(item: any) {
    this.http.delete(`http://localhost:5000/tree/${item._id}`)
      .subscribe(data => {
        this.getTreeData();
      }, error => {
        console.log(error);
      });
  }

  // Edit ------------------------------------------------------------------------------

  // Selects the whole text in the text editor
  selectContent(e: any) {
    if (e.target) {
      setTimeout(function () {
        e.target.setSelectionRange(0, e.target.value.length);
      }, 1);
    }
  }

  showEditor(item: any) {
    this.originalText = item.text;
    this.isEditActive = true;
    this.editItem = item;
    this.editorFocused = true;

    item.allowDrag = false;
  }

  closeEditor() {
    if (this.editItem)
      this.editItem.allowDrag = true;

    this.editItem = null;
    this.originalText = '';
    this.editorFocused = false;
  }

  editorKeyDown(e: any) {
    if (this.editItem) {
      switch (e.keyCode) {
        case 13: // ENTER
          this.closeEditor();
          break;

        case 27: // ESCAPE
          this.editItem.text = this.originalText;
          this.closeEditor();
          break;
      }
    }
  }

  editorLostFocus() {
    if (this.editItem)
      if (this.editItem.text === this.originalText) {
        this.editItem.text = this.originalText;        
      } else {
        this.originalText = this.editItem.text;
      }
    this.saveTreeData();
    this.closeEditor();
  }

  saveTreeData() {
    this.http.post(`http://localhost:5000/tree/`, this.editItem)
      .subscribe(data => {
        this.getTreeData();
      }, error => {
        console.log(error);
      });
  }

  getTreeData() {
    this.http.get(`http://localhost:5000/tree/`)
      .subscribe((data: any) => {
        console.log(data)
        this.items = data.message;
      }, error => {
        console.log(error);
      })
  }
}
