// Récupération des pièces depuis le fichier JSON

const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

/*
    const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());
*/

// Fonction centrale (qui gère toute la page web)

function afficherPieces(liste) {
    const sectionCartes = document.querySelector(".cartes");
    sectionCartes.innerHTML = "";

    for (let piece of liste) {
        const article = document.createElement("article");

        const imagePiece = document.createElement("img");
        imagePiece.src = piece.image;
        imagePiece.alt = piece.nom;

        const nomPiece = document.createElement("h2");
        nomPiece.innerText = piece.nom;

        const prixPiece = document.createElement("p");
        prixPiece.innerText = "Prix : " + (piece.prix < 35 ? `${piece.prix} €` : `${piece.prix} €€€`);

        const categoriePiece = document.createElement("p");
        categoriePiece.innerText = "Catégorie : " + (piece.categorie ?? "Aucune catégorie");

        const descriptionPiece = document.createElement("p");
        descriptionPiece.innerText = piece.description ?? "Pas de description pour le moment";

        const disponibilitePiece = document.createElement("p");
        disponibilitePiece.innerText = piece.disponibilite ? "En stock" : "Rupture de stock";

        article.appendChild(imagePiece);
        article.appendChild(nomPiece);
        article.appendChild(prixPiece);
        article.appendChild(categoriePiece);
        article.appendChild(descriptionPiece);
        article.appendChild(disponibilitePiece);

        sectionCartes.appendChild(article);

        if (!piece.disponibilite) {
            article.classList.add("indisponible");
        }
    }
}

// Premier affichage de la page

afficherPieces(pieces);

// Affichage des pièces par ordre de prix croissant

const btnTrier = document.querySelector(".btn-trier");
btnTrier.addEventListener("click", () => {
    const piecesOrdonnes = Array.from(pieces);
    piecesOrdonnes.sort((a, b) => a.prix - b.prix);
    afficherPieces(piecesOrdonnes);
})

// Affichage des pièces par ordre de prix décroissant

const btnDecroissant = document.querySelector(".btn-decroissant");
btnDecroissant.addEventListener("click", () => {
    const piecesOrdonnes = Array.from(pieces);
    piecesOrdonnes.sort((a, b) => b.prix - a.prix);
    afficherPieces(piecesOrdonnes);
})

// Filtrage des pièces non abordables

const btnFiltrer = document.querySelector(".btn-filtrer");
btnFiltrer.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(piece => piece.prix <= 35);
    afficherPieces(piecesFiltrees);
})

// Filtrage des pièces sans description 

const btnNoDescription = document.querySelector(".no-description");
btnNoDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(piece => piece.description);
    afficherPieces(piecesFiltrees);
})

// utilisation de la fonction filter() pour filtrer les pièces disponibles

const piecesDisponibles = pieces.filter(piece => piece.disponibilite);

const elementPDisponible = document.createElement("p");
elementPDisponible.innerText = "Pièces disponibles : ";

const elementUlDisponible = document.createElement("ul");

for (let piece of piecesDisponibles) {
    const elementListe = document.createElement("li");
    elementListe.innerText = `${piece.nom} - ${piece.prix} €`;
    elementUlDisponible.appendChild(elementListe);
}

const sectionDisponible = document.querySelector(".disponibles");

if (sectionDisponible) {
    sectionDisponible.appendChild(elementPDisponible);
    sectionDisponible.appendChild(elementUlDisponible);
} else {
    console.error("La section .disponibles est introuvable dans le DOM");
}


// utilisation de la fonction filter() pour filtrer les pièces abordables
const piecesAbordables = pieces.filter(piece => piece.prix <= 35);

const elementPAbordable = document.createElement("p");
elementPAbordable.innerText = "Pièces abordables : ";

const elementUlAbordable = document.createElement("ul");

// Ajout de chaque élément de la liste à la balise ul
for (let piece of piecesAbordables) {
    const elementListe = document.createElement("li");
    elementListe.innerText = `${piece.nom}`;
    elementUlAbordable.appendChild(elementListe);
}

// Ajout de l'element p et de la liste ul
const sectionAbordable = document.querySelector(".abordables");

if (sectionAbordable) {
    sectionAbordable.appendChild(elementPAbordable);
    sectionAbordable.appendChild(elementUlAbordable);
} else {
    console.error("La section .abordables est introuvable dans le DOM");
}

const inputPrixMax = document.querySelector("#prix-max");
const spanValeurPrix = document.querySelector("#valeur-prix");
spanValeurPrix.innerText = inputPrixMax.value;

inputPrixMax.addEventListener("input", () => {
    spanValeurPrix.innerText = inputPrixMax.value;
    const piecesFiltrees = pieces.filter(piece => piece.prix <= Number(inputPrixMax.value));
    afficherPieces(piecesFiltrees);
})