export function filterNodes(cy: cytoscape.Core, type: string, value: string) {
  if (!value) {
    cy.elements().style('display', 'element');
    return;
  }

  cy.elements().style('display', 'none');
  cy.elements(`[type = "${type}"][value = "${value}"]`).style('display', 'element');
}