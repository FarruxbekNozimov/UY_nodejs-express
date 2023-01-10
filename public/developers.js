let developersData = [
	{
		imgContUrl: "https://i.imgur.com/2DhmtJ4.jpg",
		imgDevUrl: "https://i.imgur.com/sjLMNDM.png",
		nameTitle: "Eshmatov Mamarayim ",
		aboutDev:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?",
	},
	{
		imgContUrl: "/img/about/code1.jpg",
		imgDevUrl: "/img/about/dev1.jpg",
		nameTitle: "FarruxDEV ",
		aboutDev:
			"Men FarruxDEV falon yili falon kuni falon shahrida tavvallud topganman. ",
	},
	{
		imgContUrl: "/img/about/code.jpg",
		imgDevUrl: "/img/about/dev.jpg",
		nameTitle: "Toshmatov G`ishmat",
		aboutDev:
			"Toshmatov G`ishmat 2000-yil Tangatopdi qishlog`ida Hunarmandlar oilasida tug`ilgan",
	},
];
let developers = document.getElementById("aboutDevs");
console.log(developers);
for (let i in developersData) {
	developers.innerHTML += `
  	<li>
		<a href="" class="card1">
			<img src="${developersData[i].imgContUrl}" class="card_image" alt="" />
			<div class="card_overlay">
				<div class="card_header">
					<img class="card_thumb" src="${developersData[i].imgDevUrl}" alt="" />
					<div class="card_header-text">
						<h3 class="card_title">${developersData[i].nameTitle}</h3>
						<span class="card_status">1 hour ago</span>
					</div>
				</div>
				<p class="card_description">${developersData[i].aboutDev}</p>
			</div>
		</a>
	</li>
  `;
}
