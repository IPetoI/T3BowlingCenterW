import { Component } from '@angular/core';

@Component({
  selector: 'app-galleria',
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.scss']
})
export class GalleriaComponent {

  modal: any;
  modalImg: any;
  melyikKep: any;
  indexKiiras: any;
  indexMax: string = " / 9";

  nagyitas(kep: string) {
    
    this.melyikKep = document.getElementById(kep);
    this.modalImg = document.getElementById("nagyKep");
    this.modal = document.getElementById("nagyKepDiv");
    this.indexKiiras = document.getElementById("index");
  
    this.modal.style.paddingTop = window.innerHeight/2-275 + "px";
    this.modal.style.display = "block";

    this.modalImg.src = this.melyikKep.src;

    this.indexKiiras.textContent = this.melyikKep.src.slice(-5).at(-5) + this.indexMax;
    
    document.body.classList.add("neGorgess");
  }

  nagyLapozas(merre: boolean) { // true bal - false jobb
    let kepek = [];
    let index = 0;

    this.indexKiiras = document.getElementById("index");
  
    for (let i=1; i < 10; i++) {
      let utvonal = this.melyikKep.src.slice(0, -5)+i+".jpg";
      console.log(this.melyikKep.src.slice(0, -5)+i+".jpg");
      kepek.push(utvonal);
    }
    
    for(let i=0;i<9;i++) {
      if (this.modalImg.src == kepek[i]) {
        index = i;
      }
    }
  
    if (merre && index > 0) { // balra ha már vagyunk jobbra
      this.modalImg.src = kepek[index-1];
      index--;
      this.indexKiiras.textContent = index+1 + this.indexMax;
    } else if (merre && index == 0) { // balra ha elson vagyunk
       this.modalImg.src = kepek[8];
       index = 8;
       this.indexKiiras.textContent = index+1 + this.indexMax;
    } else if (!merre && index < 8) { // jobbra ha már vagyunk balra
       this.modalImg.src = kepek[index+1];
       index++;
       this.indexKiiras.textContent = index+1 + this.indexMax;
    } else if (!merre && index == 8) { // jobbra ha utolson vagyunk
       this.modalImg.src = kepek[0];
       index = 0;
       this.indexKiiras.textContent = index+1 + this.indexMax;
     }
  }

  bezarasa: any;
  negorgess = false;

  bezaras() {
    this.bezarasa = document.getElementById("bezar");
    this.modal.style.display = "none";

    this.negorgess = false;
    let body = document.body;
    body.style.overflow = this.negorgess ? 'hidden' : 'auto'; 
  }

  negorgesss() {
    this.negorgess = !this.negorgess;
    let body = document.body;
    body.style.overflow = this.negorgess ? 'hidden' : 'auto'; 
  }
}