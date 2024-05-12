import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../nyilvanos/service/auth.service';
import { Felhasznalo } from '../../nyilvanos/models/felhasznalo';
import { FelhasznaloService } from '../../nyilvanos/service/felhasznalo.service';
import { FoglalasService } from 'src/app/nyilvanos/service/foglalas.service';
import { Palyafoglalas } from 'src/app/nyilvanos/models/palyafoglalas';
import { HelyService } from 'src/app/nyilvanos/service/hely.service';
import { Hely } from 'src/app/nyilvanos/models/hely';
import { take } from 'rxjs';

@Component({
	selector: 'app-profil',
	templateUrl: './profil.component.html',
	styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

	constructor(private authService: AuthService, private felhasznaloService: FelhasznaloService,
		private foglalasService: FoglalasService, private helyService: HelyService) { }

	jelenlegiNev: string = "";
	jelenlegiEmailCim: string = "";
	jelenlegiTelefonszam: string = "";
	szemelySzam: string = "";
	hanyadika: string = "";
	ora: string = "";
	ar: string = "";

	nincsfoglalas: boolean = false;
	adatok: any[] = [];

	bejelentkezetFelhasznalo?: firebase.default.User | null;
	felhasznalo?: Felhasznalo;
	felhasznaloId: any;

	ngOnInit(): void {
		this.authService.felhasznaloBejelentkezve().subscribe(user => {
			this.bejelentkezetFelhasznalo = user;
			this.felhasznaloId = user?.uid;

			this.felhasznaloService.getById(this.felhasznaloId).subscribe(data => {
				this.felhasznalo = data;
				this.jelenlegiNev = this.felhasznalo?.nev as string;
				this.jelenlegiEmailCim = this.felhasznalo?.email as string;
				this.jelenlegiTelefonszam = this.felhasznalo?.telefonszam as string;

				this.foglalasService.getAll(this.jelenlegiEmailCim).subscribe(
					(data: Palyafoglalas[]) => {
						this.adatok = data.map(foglalas => ({
							szemelySzam: foglalas.hanyan_jonnek + " Személy",
							hanyadika: foglalas.melyik_nap,
							ora: foglalas.melyik_ora,
							ar: foglalas.ar,
							foglalas_id: foglalas.foglalas_id
						}));
						this.beszurHTMLKod()
					}, error => {
						console.error(error);
					});
			}, error => {
				console.error(error);
			});
		}, error => {
			console.error(error);
		});
	}

	emailSzerkesztes() {
		let szerkesztoMezo = prompt("E-mail szerkesztése:\npélda: t3bowlingcenter@gmail.com", this.jelenlegiEmailCim);

		while (szerkesztoMezo !== null && szerkesztoMezo.trim() !== "") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (emailRegex.test(szerkesztoMezo)) {
				this.jelenlegiEmailCim = szerkesztoMezo;
				this.adatbazisFrissitesEmail(szerkesztoMezo);
				break;
			} else {
				const ismetlesekSzama = 3;
				let probalkozasok = 0;

				while (probalkozasok < ismetlesekSzama) {
					szerkesztoMezo = prompt("Érvénytelen e-mail cím! Kérlek, adj meg egy érvényes e-mail címet:", szerkesztoMezo);

					if (szerkesztoMezo !== null && szerkesztoMezo.trim() !== "") {
						if (emailRegex.test(szerkesztoMezo)) {
							this.jelenlegiEmailCim = szerkesztoMezo;
							this.adatbazisFrissitesEmail(szerkesztoMezo);
							break;
						} else {
							probalkozasok++;
						}
					} else {
						break;
					}
				}
				if (probalkozasok === ismetlesekSzama) {
					confirm("Túllépted a próbálkozások számát.");
					break;
				}
			}
		}
	}

	adatbazisFrissitesEmail(ujEmail: string) {
		if (this.bejelentkezetFelhasznalo && this.felhasznalo) {
			this.felhasznalo.email = ujEmail;

			this.felhasznaloService.update(this.felhasznalo).then(() => {
				console.log("E-mail sikeresen frissítve!");
			}).catch(error => {
				console.error("Hiba történt az e-mail frissítése során.", error);
			});
		}
	}

	telefonszamSzerkesztes() {
		let szerkesztoMezo = prompt("Telefonszám szerkesztése:\npélda: +36 70 000 0000", this.jelenlegiTelefonszam);

		while (szerkesztoMezo !== null && szerkesztoMezo.trim() !== "") {
			const telRegex = /^\+36 (20|30|70) \d{3} \d{4}$/;
			if (telRegex.test(szerkesztoMezo)) {
				this.jelenlegiTelefonszam = szerkesztoMezo;
				this.adatbazisFrissitesTel(szerkesztoMezo);
				break;
			} else {
				const ismetlesekSzama = 3;
				let probalkozasok = 0;

				while (probalkozasok < ismetlesekSzama) {
					szerkesztoMezo = prompt("Érvénytelen telefonszám! Kérlek, adj meg egy érvényes telefonszámot:", szerkesztoMezo);

					if (szerkesztoMezo !== null && szerkesztoMezo.trim() !== "") {
						if (telRegex.test(szerkesztoMezo)) {
							this.jelenlegiTelefonszam = szerkesztoMezo;
							this.adatbazisFrissitesTel(szerkesztoMezo);
							break;
						} else {
							probalkozasok++;
						}
					} else {
						break;
					}
				}
				if (probalkozasok === ismetlesekSzama) {
					confirm("Túllépted a próbálkozások számát.");
					break;
				}
			}
		}
	}

	adatbazisFrissitesTel(ujTel: string) {
		if (this.bejelentkezetFelhasznalo && this.felhasznalo) {
			this.felhasznalo.telefonszam = ujTel;

			this.felhasznaloService.update(this.felhasznalo).then(() => {
				console.log("Telefonszám sikeresen frissítve!");
			}).catch(error => {
				console.error("Hiba történt a telefonszám frissítése során.", error);
			});
		}
	}

	beszurHTMLKod() {
		const tablaElem = document.getElementById('foglalasokLista');
		let i = 0;

		if (tablaElem) {
			while (tablaElem.children.length > 1) {
				tablaElem.removeChild(tablaElem.children[1]);
			}
		}
		if (this.adatok.length == 0) {
			this.nincsfoglalas = true;
			if (tablaElem) {
				while (tablaElem.firstChild) {
					tablaElem.removeChild(tablaElem.firstChild);
				}
			}
		}

		for (const adat of this.adatok) {
			const trElem = document.createElement('tr');
			trElem.innerHTML = `
        <td style="background-color: #CE5501; text-align: center">${adat.szemelySzam}</td>
        <td style="background-color: #CE5501; text-align: center">${adat.hanyadika}</td>
        <td style="background-color: #CE5501; text-align: center">${adat.ora}</td>
        <td style="background-color: #CE5501; text-align: center">${adat.ar}</td>
        <td style="text-align: center"><button style="background-color: #FF9205; background-image: url(../../../assets/kepek/kuka.png);
          background-size: cover; background-position: center; width: 25px; height: 25px; border: none;
          cursor: pointer;" id="${adat.foglalas_id}"></button></td>
      `;
			i++;
			tablaElem?.appendChild(trElem);

			const button = document.getElementById(`${adat.foglalas_id}`);
			button?.addEventListener('click', (event) => this.foglalasTorlese(event));
		}
		const alapFoglalasokElem = document.getElementById('alapFoglalasok');
		const mainElem = document.body.querySelector('main');
		if (alapFoglalasokElem && mainElem) {
			alapFoglalasokElem.style.height = `${this.adatok.length * 49 + 220}px`;
			mainElem.style.height = `${this.adatok.length * 49 + 1000}px`;
		}
	}

	foglalasTorlese(event: Event) {
		const button = event.target as HTMLButtonElement;
		const foglalasId = button.id;
		const talalatHely = this.adatok.find(adat => adat.foglalas_id === foglalasId);

		if (confirm("Biztosan törölni szeretnéd?")) {
			this.foglalasService.delete(foglalasId)
				.then(() => {
					console.log("Sikeres időpont törlés!");

					const talalatIndex = this.adatok.findIndex(adat => adat.foglalas_id === foglalasId);

					this.helyService.getAll().pipe(take(1)).subscribe(
						(helyek: Hely[]) => {
							const meglevoHely = helyek.find(h => h.foglalas_datuma === talalatHely.hanyadika && h.foglalas_ora === talalatHely.ora);
							if (meglevoHely) {
								if (meglevoHely.alkalom_szama > 1) {
									meglevoHely.alkalom_szama--;
									this.helyService.update(meglevoHely).then(() => {
										console.log('Sikeresen frissült a helyek adatbázisa!');
									});
								}else {
									this.helyService.delete(meglevoHely).then(() => {
										console.log('Sikeres hely törlés!');
									});
								}
							}
						},
						error => {
							console.error(error);
						}
					);
					if (talalatIndex !== -1) {
						this.adatok.splice(talalatIndex, 1);
						const ujAdatok = [...this.adatok];
						this.adatok = ujAdatok;
					}
				}).catch(error => {
					console.error(error);
				});
		}
	}
}