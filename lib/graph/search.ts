export function searchNodes(cy: cytoscape.Core, searchTerm: string) {
  if (!searchTerm) {
    cy.elements().removeClass('highlighted').style('opacity', 1);
    return;
  }

  const searchRegex = new RegExp(searchTerm, 'i');
  cy.elements().removeClass('highlighted').style('opacity', 0.3);

  const matchedElements = cy.elements().filter((ele) => {
    const data = ele.data();
    return searchRegex.test(data.label);
  });

  matchedElements.addClass('highlighted').style('opacity', 1);
}