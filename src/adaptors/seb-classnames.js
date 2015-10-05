import classnames from 'classnames';

var methods = {
  classes: (nodeList, classDef) => {
    [].forEach.call(nodeList, node => {
      node.className = classnames(classDef);
    });
  }
}

export default methods;
