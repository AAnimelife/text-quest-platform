import React from 'react';
import Tree from 'react-d3-tree';

const QuestTree = ({ pages }) => {
  const buildTree = (pages) => {
    const pageMap = new Map();
    const childRefs = new Set();

    // Шаг 1: создаем базовую карту страниц
    pages.forEach((page) => {
      pageMap.set(page._id, { ...page, children: [] });
    });

    // Шаг 2: строим дерево, избегая дублирования и циклов
    const buildNode = (id, visited = new Set()) => {
      if (!pageMap.has(id)) return null;

      // Защита от циклов
      if (visited.has(id)) {
        return {
          _id: id,
          title: `(loop) ${pageMap.get(id).title}`,
          children: [],
        };
      }

      const node = pageMap.get(id);
      const newNode = {
        _id: node._id,
        title: node.title,
        children: [],
      };

      // Помечаем как посещённый
      visited.add(id);

      if (node.choices && node.choices.length > 0) {
        node.choices.forEach((choice) => {
          if (choice.nextPage && pageMap.has(choice.nextPage)) {
            childRefs.add(choice.nextPage);
            const childNode = buildNode(choice.nextPage, new Set(visited));
            if (childNode) {
              newNode.children.push(childNode);
            }
          }
        });
      }

      return newNode;
    };

    // Шаг 3: определяем корневые узлы (на которые никто не ссылается)
    const rootNodes = [];
    pages.forEach((page) => {
      if (!childRefs.has(page._id)) {
        const rootNode = buildNode(page._id);
        if (rootNode) rootNodes.push(rootNode);
      }
    });

    // Если все узлы являются дочерними — возвращаем все, как fallback
    if (rootNodes.length === 0) {
      return pages.map((page) => buildNode(page._id));
    }

    return rootNodes;
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
        renderCustomNodeElement={({ nodeDatum }) => (
          <g>
            <circle r="15" fill="#82ca9d" />
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
