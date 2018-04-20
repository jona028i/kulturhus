let arrengementHolder = []
let seatsstatus = [];
let Classseatsstatus;
var ticketIndex;
let index;
let ticketrække = [];
let ticketplads = [];
let ticketinfo = [];
let title;
let ppr;
let rækker;
let pris;
let plads = [];
let paymentrække;
let paymentplads;
let paymentsal;
let paymenttitle;
let paymentpris;
let paymentstatus;
let paymentid;
let getid
if (document.querySelector('select')) {
	document.querySelector('select').addEventListener('change', (e) => {
		let categori = e.target.value;
		if (categori === undefined || categori == '') {
			categori = '';
		} else {
			categori = '/' + categori;
		}
		runFetch(categori);
	})
}

document.addEventListener('DOMContentLoaded', (e) => {
	let categori = e.target.value;
	if (categori === undefined || categori == '') {
		categori = '';
	} else {
		categori = '/' + categori;
	}
	runFetch(categori);
	let realurl = window.location.href.split('?')[0].split('/kulturhus/')[1];

	if (realurl == 'oplysninger.html') {
		ticket();
	} else if (realurl == 'accept.html') {
		recive()
	} else if (realurl == 'afbestil.html') {
		afbestil()
	} else if (realurl == 'kontakt.html') {
		besked()
	}
})

function runFetch(categori) {
	let domainUrl = 'http://localhost:3370/alle/cat/';
	let url = domainUrl + categori;
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let events = document.querySelector('.events')
			events.innerHTML = '';
			data.forEach(function (element, index) {
				let pladser = element.ppr * element.rækker;
				if (element.seatsstatus == undefined) {
					Classseatsstatus = [];
				} else {
					Classseatsstatus = element.seatsstatus;
					Classseatsstatus = Classseatsstatus.split('')
				}
				arrengementHolder[index] = new arrengement(element.navn, element.beskrivelse, element.længde, element.date, element.price, pladser, element.ppr, element.rækker, element.type, index, Classseatsstatus, element.id)
				arrengementHolder[index].createArrengement()
			}, this);
			addlisteners()
			// for ()
		})
}

function addlisteners() {
	let btns = document.querySelectorAll('.btn-danger')
	btns.forEach((element) => {
		element.addEventListener('click', (e) => {
			index = parseInt(e.target.dataset.index)
			ppr = parseInt(e.target.dataset.ppr)
			rækker = parseInt(e.target.dataset.rækker)
			pris = parseInt(e.target.dataset.pris)
			title = e.target.dataset.title
			console.log(title)
			arrengementHolder[index].sal(ppr, rækker);
			addSeatListeners();
			console.log(index)
		})
	})

	let bestilbut = document.querySelector('.bestil');
	bestilbut.addEventListener('click', () => {
		let seats = document.querySelectorAll('.seat');
		seats.forEach((e, i) => {
			if (e.dataset.status == 'chose') e.dataset.status = 'taken';
			seatsstatus[i] = e.dataset.status;
		})
		for (var i = 0; i < seatsstatus.length; i++) {
			if (seatsstatus[i] == 'free') seatsstatus[i] = 0
			if (seatsstatus[i] == 'taken') seatsstatus[i] = 1
		}
		console.log(index)
		plads.forEach((e, i) => {
			ticketrække[i] = Math.ceil(plads[i] / ppr);
			if (plads[i] % ppr == 0) {
				ticketplads[i] = ppr;
			} else {
				ticketplads[i] = (plads[i] % ppr);
			}
			console.log(ticketrække)
			console.log(ticketplads)
		})

		seatsstatus = seatsstatus.toString()
		seatsstatus = seatsstatus.replace(/,/g, "");
		//seatsstatus
		window.location.replace(`oplysninger.html?raekke=${ticketrække}?plads=${ticketplads}?sal=${index}?film=${title}?pris=${pris}?status=${seatsstatus}?id=${seats[0].dataset.id}`);
	})
}

function ticket() {
	let url = window.location.href
	url = url.split('?');
	url.splice(0, 1)
	url.forEach((e, i) => {
		//ticketinfo arry
		ticketinfo[i] = e.split('=')[1]
	})
	let billet = document.querySelector('.billet')
	paymentrække = JSON.parse("[" + ticketinfo[0] + "]");
	let paymentrækkecheck = paymentrække.every(
		function (value, _, array) {
			return array[0] === value;
		}
	)
	if (paymentrækkecheck == true) {
		paymentrække = paymentrække[0];
	}
	paymentplads = JSON.parse("[" + ticketinfo[1] + "]");
	paymentsal = (parseInt(ticketinfo[2]) + 1);
	paymenttitle = ticketinfo[3]
	paymenttitle = paymenttitle.replace(/%20/g, ' ');

	paymentpris = (parseInt(ticketinfo[4]))

	paymentstatus = ticketinfo[5]
	paymentid = (parseInt(ticketinfo[6]))
	billet.innerHTML = `<h1>${paymenttitle}</h1><p>sal ${paymentsal} række ${paymentrække} plads ${paymentplads} pris ${paymentpris*paymentplads.length}</p><p>Antal billeter: ${paymentplads.length}</p>`;

	document.querySelector('.bestilknap').addEventListener('click', () => {
		runupdate(paymentstatus, paymentid)
	})

}

function recive() {
	let url = window.location.href
	url = url.split('?');
	url.splice(0, 1)
	url.forEach((e, i) => {
		//ticketinfo arry
		ticketinfo[i] = e.split('=')[1]
	})
	let billet = document.querySelector('.billet')
	paymentrække = JSON.parse("[" + ticketinfo[0] + "]");
	let paymentrækkecheck = paymentrække.every(
		function (value, _, array) {
			return array[0] === value;
		}
	)
	if (paymentrækkecheck == true) {
		paymentrække = paymentrække[0];
	}
	paymentplads = JSON.parse("[" + ticketinfo[1] + "]");
	paymentsal = (parseInt(ticketinfo[2]) + 1);
	paymenttitle = ticketinfo[3]
	paymenttitle = paymenttitle.replace(/%20/g, ' ');

	paymentpris = (parseInt(ticketinfo[4]))
	let recivename = ticketinfo[5].toString().split(',')[0];
	recivename = recivename.replace('%20', ' ')
	let reciveemail = ticketinfo[5].toString().split(',')[1]
	let recivenumber = ticketinfo[5].toString().split(',')[2]

	billet.innerHTML = `<h1>${paymenttitle}</h1><p>sal ${paymentsal} række ${paymentrække} plads ${paymentplads} pris ${paymentpris*paymentplads.length}</p><p>Antal billeter: ${paymentplads.length}</p><h3>Kontakt Oplysninger</h3><p class="navn">Navn: <strong>${recivename}</strong></p><p class="email">Email: <strong>${reciveemail}</strong></p><p class="nummer">Nummer: <strong>${recivenumber}</strong></p>`;

}

function runupdate(status, id) {
	let updateurl = `http://localhost:3370/update/${id}/${ status}`;
	console.log(updateurl)
	let headers = new Headers();
	headers.append('content-type', 'application/json')

	let init = {
		method: 'put',
		headers: headers,
		cache: 'no-cache',
		cors: 'cors'
	};
	let request = new Request(updateurl, init);
	fetch(request)
		.then(response => {

			if (response.status == 200) {
				runrecive();
			} else {
				throw new Error('Produkt blev ikke opdateret')
			}
		}).catch(err => {
			console.log(err);
		});
}

function runrecive() {

	let url = window.location.href
	url = url.split('?');
	url.splice(0, 1)
	url.forEach((e, i) => {
		//ticketinfo arry
		ticketinfo[i] = e.split('=')[1]
	})
	paymentsal = (parseInt(ticketinfo[2]) + 1);
	paymenttitle = ticketinfo[3]
	paymenttitle = paymenttitle.replace(/%20/g, ' ');

	paymentpris = (parseInt(ticketinfo[4]))


	//fetch /bestilling/:navn/:email/:tlf/:sal/:plads
	let navn = document.querySelector('#name')
	let email = document.querySelector('#email')
	// email.value = email.value.replace('@', '_');
	let number = document.querySelector('#number')

	let data = [navn.value, email.value, number.value];

	let pladsrække = '';
	pladsrække += `R${paymentrække}_P${paymentplads}`;

	let bestilurl = `http://localhost:3370/bestilling/${navn.value}/${email.value}/${number.value}/${paymentsal}/${pladsrække}`;

	////sal film pris data == undefined //////////////////////////////////////////

	let headers = new Headers();
	headers.append('content-type', 'application/json')

	let init = {
		method: 'put',
		headers: headers,
		cache: 'no-cache',
		cors: 'cors'
	};
	let request = new Request(bestilurl, init);
	fetch(request)
		.then(response => {

			if (response.status == 200) {
				window.location.replace(`accept.html?raekke=${paymentrække}?plads=${paymentplads}?sal=${paymentsal}?film=${paymenttitle}?pris=${paymentpris}?data=${data.toString()}`)
			} else {
				throw new Error('Produkt blev ikke opdateret')
			}
		}).catch(err => {
			console.log(err);
		});
}

function addSeatListeners() {
	let seats = document.querySelectorAll('.seat');
	seats.forEach((element, index) => {
		element.addEventListener('click', (e) => {

			console.log(plads[plads.length - 1])
			if (e.target.dataset.status == 'free') {
				e.target.setAttribute('class', 'seat chose')
				e.target.setAttribute('data-status', 'chose')
				plads[plads.length] = e.target.dataset.index;
			} else if (e.target.dataset.status == 'chose') {
				e.target.setAttribute('class', 'seat free')
				e.target.setAttribute('data-status', 'free')
				plads.splice(plads.indexOf(e.target.dataset.index), 1)
			}
			console.log(plads)
		})
	})
}

function afbestil() {
	let tlf = document.querySelector('#nummer');
	document.querySelector('.afbestilknap').addEventListener('click', () => {
		if (tlf.value.length < 8) {

		} else {
			let url = `http://localhost:3370/getsal/${tlf.value}`;
			fetch(url)
				.then((response) => {
					console.log(response);
					return response.json();
				})
				.then((data) => {
					console.log(data[0])
					fetchtwo(data[0], tlf.value)
				})

		}
	})

}

function fetchtwo(data, tlf) {
	getid = data.sal
	getpladser = data.plads
	// alert(getpladser)
	let newUrl = `http://localhost:3370/alle/id/${getid}`
	fetch(newUrl)
		.then((response) => {
			// console.log(response);
			return response.json();
		})
		.then((data) => {
			data = data[0];

			ppr = data.ppr;
			rows = data.rækker;

			// console.log(rows)
			let seatsstatus = data.seatsstatus

			console.log(seatsstatus)
			let insert = ",";

			for (var i = rows - 1; i > 0; i--) {
				// console.log(i)
				seatsstatus = [seatsstatus.slice(0, ppr * i), insert, seatsstatus.slice(ppr * i)].join('');
			}
			// console.log(typeof (seatsstatus));
			seatsstatus = seatsstatus.split(',');
			let getseatsinfo = getpladser.split('_');
			let getrække = getseatsinfo[0].split('R')[1];
			let getplads = getseatsinfo[1].split('P')[1];
			getplads = getplads.split(',');

			// console.log(seatsstatus[getrække - 1]);
			let getseatsrække = seatsstatus[getrække - 1];
			getseatsstatus = getseatsrække.split('');
			getseatsstatus.forEach((e, i) => {
				if (e != '0' || e != 0) {
					getseatsstatus[i] = '0';
				}
			})
			seatsstatus[getrække - 1] = getseatsstatus.toString().replace(/,/g, '');

			// console.log(seatsstatus[getrække - 1]);

			seatsstatus = seatsstatus.toString().replace(/,/g, '');
			console.log(tlf)
			console.log(seatsstatus)
			deletebestil(tlf, seatsstatus, getid);
			console.log(getid)

		})

}

function deletebestil(tlf, status, id) {
	alert('nu vi her')
	let url = `http://localhost:3370/del/${tlf}`;
	let headers = new Headers();
	headers.append('content-type', 'application/json')

	let init = {
		method: 'delete',
		headers: headers,
		cache: 'no-cache',
		cors: 'cors'
	};

	alert('før request')
	let request = new Request(url, init);
	fetch(request)
		.then((response) => {

			alert('det ehr er indei')
			// window.location.replace('index.html')


		}).catch(err => {
			console.log(err)
		})

	alert('det ehr er efter')
	let updateurl = `http://localhost:3370/update/${id}/${status}`;
	console.log(updateurl)
	headers = new Headers();
	headers.append('content-type', 'application/json')

	init = {
		method: 'put',
		headers: headers,
		cache: 'no-cache',
		cors: 'cors'
	};
	request = new Request(updateurl, init);
	fetch(request)
		.then(response => {

			if (response.status == 200) {
				alert('bestilling slettet')
			} else {
				throw new Error('Produkt blev ikke opdateret')
			}
		}).catch(err => {
			console.log(err);
		});

}

function besked() {
	document.querySelector('#kontaktknap').addEventListener('click', () => {
		let navn = document.querySelector('#navn')
		let email = document.querySelector('#email')
		let number = document.querySelector('#nummer')
		let emne = document.querySelector('#emne')
		let besked = document.querySelector('#besked')



		let bestilurl = `http://localhost:3370/kontakt/${navn.value}/${email.value}/${number.value}/${emne.value}/${besked.value}`;


		let headers = new Headers();
		headers.append('content-type', 'application/json')

		let init = {
			method: 'put',
			headers: headers,
			cache: 'no-cache',
			cors: 'cors'
		};
		let request = new Request(bestilurl, init);
		fetch(request)
			.then(response => {

				if (response.status == 200) {
					window.location.replace('index.html')
				} else {
					throw new Error('Produkt blev ikke opdateret')
				}
			}).catch(err => {
				console.log(err);
			});
	})
}


// arrengementHolder.sal();