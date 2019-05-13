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
  private parentItem: any = {};
  
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
  // When user click on add tree button to create new tree so it will dynamically show dummay item text
  // in input box 
  createNewItem() {
    this.itemCount++;

    return { text: "Item " + this.itemCount };
    
  }

  // When we will add child tree in the parent tree
  // that time this function will call
  addRoot() {
    let item: any = this.createNewItem();

    this.treeview.addItem(item);
    this.showEditor(item);
  }

  // When we will add child tree in the parent tree
  // that time this function will call
  addChild(parent: any) {
    this.parentItem = parent;
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
    console.log("show", item)
    this.originalText = item.text;
    this.isEditActive = true;
    this.editItem = item;
    this.editorFocused = true;

    item.allowDrag = false;
  }

  // When user come back from edit mode in tree
  // like after creating new tree hit enter or click out side the input box 
  // that time this function will call
  closeEditor() {
    console.log()
    // after adding name of tree call POST API to save data in database
    this.saveTreeData();
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
    this.closeEditor();
  }

  // POST API call to add tree data in database
  saveTreeData() {
    const mergeItem = Object.assign({}, this.editItem, this.parentItem);
    this.http.post(`http://localhost:5000/tree/`, mergeItem)
      .subscribe(data => {
        // After successfully adding data call GET API again so it will render the new data on UI
        this.getTreeData();
      }, error => {
        console.log(error);
      });
  }

  // GET API call to fetch the tree data from database 
  getTreeData() {
    this.http.get(`http://localhost:5000/tree/`)
      .subscribe((data: any) => {
        this.items = data.message.length > 0 ? data.message : [{
          text: "Item " + this.itemCount
        }];
      }, error => {
        console.log(error);
      })
  }

  // PUT API call to update the selected tree item in database
  updateTreeData(treeData: any) {
    this.http.put(`http://localhost:5000/tree/${treeData._id}`, treeData)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      })
  }
}
