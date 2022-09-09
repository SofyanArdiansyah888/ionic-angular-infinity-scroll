import { Component, ViewChild } from "@angular/core";
import { LoadingController, NavController } from "@ionic/angular";
import { IonInfiniteScroll } from "@ionic/angular";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  spareparts = [];
  data = [];
  pageNumber = 5;
  pageLimit = 10;
  searching = true;
  public searchTerm: string = "";

  constructor(
    private navCtrl: NavController,
    private loadCtrl: LoadingController
  ) {
    this.getData();
  }

  getData() {
    this.loading();
    fetch("../../assets/spareparts.json")
      .then((res) => res.json())
      .then((result) => {
        this.data = result.data;
        this.addMoreItems();
        this.searching = false;
      });
  }

  toDetail(item) {
    localStorage.setItem("item", JSON.stringify(item));
    this.navCtrl.navigateForward("detail");
  }

  loadData(event) {
    setTimeout(() => {
      this.addMoreItems();
      event.target.complete();
      if (this.spareparts.length == this.data.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  addMoreItems() {
    for (let i = 0; i < this.pageLimit; i++) {
      if (this.pageNumber <= this.data.length) {
        this.spareparts.push(this.data[this.pageNumber]);
        this.pageNumber++;
      }
    }
  }

  async setFilteredItems() {
    this.loading();

    this.spareparts = this.data
      .filter((item) => {
        const search = this.searchTerm.toLowerCase();
        const result =
          item.MATERIAL_NO.toLowerCase().indexOf(search) > -1 ||
          item.DESCRIPTION.toLowerCase().indexOf(search) > -1 ||
          item.MODEL.toLowerCase().indexOf(search) > -1 ||
          item.MATERIAL_GROUP.toLowerCase().indexOf(search) > -1;

        return result;
      })
      .slice(0, 50);
    
    if (this.searchTerm.trim().length == 0) {
      this.spareparts = [];
      this.addMoreItems();
    }
  }

  private loading() {
    this.searching = true;
    setTimeout(() => {
      this.searching = false;
    }, 1000);
  }
}
