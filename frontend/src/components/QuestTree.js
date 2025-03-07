import React from 'react';
import Tree from 'react-d3-tree';

const QuestTree = ({ pages }) => {
  const buildTree = (pages) => {
    const tree = [];
    const pageMap = new Map();

    pages.forEach((page) => {
      pageMap.set(page._id, { ...page, children: [] });
    });

    pages.forEach((page) => {
      if (page.choices && page.choices.length > 0) {
        page.choices.forEach((choice) => {
          if (choice.nextPage && pageMap.has(choice.nextPage)) {
            pageMap.get(page._id).children.push(pageMap.get(choice.nextPage));
          }
        });
      }
    });

    pages.forEach((page) => {
      let isRoot = true;
      pages.forEach((p) => {
        if (p.choices && p.choices.some((choice) => choice.nextPage === page._id)) {
          isRoot = false;
        }
      });
      if (isRoot) {
        tree.push(pageMap.get(page._id));
      }
    });

    return tree;
  };

  const treeData = buildTree(pages);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 250, y: 50 }}
        pathFunc="step"
        collapsible={false}
        nodeSize={{ x: 200, y: 100 }}
        renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
          <g>
            <circle r="15" fill="#82ca9d" onClick={toggleNode} />
            <text fill="black" strokeWidth="1" x="20" y="5">
              {nodeDatum.title}
            </text>
          </g>
        )}
      />
    </div>
  );
};

export default QuestTree;