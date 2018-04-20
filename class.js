class arrengement {
	constructor(navn, beskrivelse, længde, date, price, pladser, ppr, rækker, type, index, seatsstatus, id) {
		this.navn = navn,
			this.beskrivelse = beskrivelse,
			this.længde = længde,
			this.date = date,
			this.price = price,
			this.pladser = pladser,
			this.ppr = ppr,
			this.rækker = rækker,
			this.type = type,
			this.index = index,
			this.seatsstatus = seatsstatus,
			this.id = id
	}
	sal(salppr, salrækker) {
		let sal = document.querySelector('.sal');
		let classes = sal.className;
		sal.setAttribute('class', classes + ' display')
		let lared = document.querySelector('.læred');
		switch (this.type) {
			case 'film':
				lared.innerHTML = "Læred";
				break;
			case 'udstilling':
				lared.innerHTML = "Udstilling";
				break;
			default:
				lared.innerHTML = "Scene";
		}
		let Mainparrentnode = document.querySelector('.pladser');

		Mainparrentnode.innerHTML = '';
		let parrentnode;
		let childnode;
		let plads;
		for (var i = 0; i < salrækker; i++) {
			parrentnode = document.createElement('div');
			parrentnode.setAttribute('class', 'række');
			for (var p = 0; p < salppr; p++) {
				plads = (((i + 2) * salppr) + (p + 1)) - (salppr * 2); //The fuck?
				childnode = document.createElement('div');
				if (this.seatsstatus[plads - 1] == '1') {
					childnode.setAttribute('class', 'seat taken')
					childnode.setAttribute('data-status', 'taken')
				} else {
					childnode.setAttribute('class', 'seat free')
					childnode.setAttribute('data-status', 'free')
				}
				childnode.setAttribute('data-index', plads)
				childnode.setAttribute('data-id', this.id)
				parrentnode.appendChild(childnode);
			}

			Mainparrentnode.appendChild(parrentnode);
		}
	}
	createArrengement() {
		let events = document.querySelector('.events')
		let parrentnode;
		let Mainparrentnode;
		let childnode;
		let textnode;
		let buttontextnode;

		Mainparrentnode = document.createElement('div');
		Mainparrentnode.setAttribute('class', 'col-md-3 event')

		childnode = document.createElement('img');
		childnode.setAttribute('src', 'https://dummyimage.com/247x400/000/fff')
		childnode.setAttribute('class', 'eventImg')

		parrentnode = document.createElement('div');
		parrentnode.setAttribute('class', 'col-md-12')
		parrentnode.appendChild(childnode);
		Mainparrentnode.appendChild(parrentnode);


		parrentnode = document.createElement('div');
		parrentnode.setAttribute('class', 'col-md-12 info')

		childnode = document.createElement('h4');
		childnode.setAttribute('class', 'title');
		textnode = document.createTextNode(this.navn);
		childnode.appendChild(textnode);
		parrentnode.appendChild(childnode);

		childnode = document.createElement('p');
		childnode.setAttribute('class', 'beskrivelse');
		textnode = document.createTextNode(this.beskrivelse);
		childnode.appendChild(textnode);
		parrentnode.appendChild(childnode);

		childnode = document.createElement('p');
		childnode.setAttribute('class', 'type');
		textnode = document.createTextNode(this.type);
		childnode.appendChild(textnode);
		parrentnode.appendChild(childnode);

		childnode = document.createElement('p');
		childnode.setAttribute('class', 'længde');
		textnode = document.createTextNode(this.længde);
		childnode.appendChild(textnode);
		parrentnode.appendChild(childnode);

		childnode = document.createElement('p');
		childnode.setAttribute('class', 'dato');
		textnode = document.createTextNode(this.date);
		childnode.appendChild(textnode);
		parrentnode.appendChild(childnode);

		childnode = document.createElement('div');
		childnode.setAttribute('class', 'btn btn-danger')
		childnode.setAttribute('data-index', this.index)
		childnode.setAttribute('data-ppr', this.ppr)
		childnode.setAttribute('data-rækker', this.rækker)
		childnode.setAttribute('data-title', this.navn)
		childnode.setAttribute('data-pris', this.price)
		buttontextnode = document.createTextNode('Bestil billeter');
		childnode.appendChild(buttontextnode);
		parrentnode.appendChild(childnode);

		Mainparrentnode.appendChild(parrentnode);
		events.appendChild(Mainparrentnode);

	}
	createticket(plads, rækker) {

	}
}