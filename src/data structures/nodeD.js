"use strict";

//A node, for usage in a doubly linked list
//Each NodeD is linked to two other nodes: linkage should be reflexive.
//NodeDs don't *necessarily* have a notion of a "previous" and a "next" node.
//But when they do, node0 is the next node, and node1 is the previous.

function NodeD (value, node0, node1) {
	this.value = value;
	this.node0 = node0;
	this.node1 = node1;
	this.traversed = false;
	this.id = NodeD.idCounter++;
};

//Represents the number of existing nodes.
//Used to distinguish between identical elements consistently.
NodeD.idCounter = 0;
	
NodeD.prototype.linkTo = function(node) {
	//Links this to node.
	if(this.node0 === undefined)
		this.node0 = node;
	else if(this.node1 === undefined)
		this.node1 = node;
	else
		throw new Error("A NodeD can only be linked to two other nodes!");
	
	//Links node to this.
	if(node.node0 === undefined)
		node.node0 = this;
	else if(node.node1 === undefined)
		node.node1 = this;
	else
		throw new Error("A NodeD can only be linked to two other nodes!");
};
	
NodeD.prototype.linkToNext = function(node) {
	this.node0 = node;
	node.node1 = this;
};

NodeD.prototype.linkToPrev = function(node) {
	this.node1 = node;
	node.node0 = this;
};

//Traverses all nodes, while avoiding backtracking.
NodeD.prototype.getCycle = function() {
	var cycle = [this.value];
	var node = this.node0;
	this.traversed = true;
	
	while(!node.traversed) {
		node.traversed = true;
		cycle.push(node.value);
		if(node.node1.traversed)
			node = node.node0;
		else
			node = node.node1;
	}
	
	return cycle;
};

//Traverses all nodes quicker than getCycle, assuming that node0 is always the "next" node.
NodeD.prototype.getOrderedCycle = function() {
	var cycle = [this.value];
	var node = this.node0;
	this.traversed = true;
	
	while(!node.traversed) {
		node.traversed = true;
		cycle.push(node.value);
		node = node.node0;
	}
	
	return cycle;
};

NodeD.prototype.getNode = function(i) {
	if(i === 0)
		return this.node0;
	return this.node1;
};