"use strict";
//A constructionNode represents how a polytope has been built up.
//It consists of a type and children.
//Children are arrays of objects, oftentimes nodes, the specific objects depend on the node type.
//They're essentially what the node "operates" on.
//The types are given below:

//Has a single PolytopeC as a child.
const POLYTOPEC = 0;
//Has a single PolytopeS as a child.
const POLYTOPES = 1;
//Has the nodes representing the factors of a prism product as children.
const MULTIPRISM = 2;
//Has a single child from which a pyramid is built.
const PYRAMID = 3;
//Has two children n, d, representing the regular polygon {n/d}.
const POLYGON = 4;
//Has a single string as a child, representing a polytope's name in Miratope's library.
const NAME = 5;

function ConstructionNode(type, children) {
	this.type = type;
	this.children = children;
};

ConstructionNode.prototype.getName = function() {
	switch(this.type) {		
		case POLYTOPEC:
			var poly = this.children[0];
			return Translation.plain(poly.elementList[poly.elementList.length - 1].length, poly.dimensions);
		case MULTIPRISM:
			return Translation.multiprism(this.getChildrenNames());
		case PYRAMID:
			return Translation.pyramid(this.children[0].getName());
		case POLYGON:
			return Translation.regularPolygonName(this.children[0], this.children[1]);
		case NAME:
			return Translation.get(this.children[0]);
		default:
			throw new Error("Not yet implemented!");
	}
};

ConstructionNode.prototype.getChildrenNames = function() {
	var childrenNames = [];
	for(var i = 0; i < this.children.length; i++)
		childrenNames.push(this.children[i].getName());
	return childrenNames;
};