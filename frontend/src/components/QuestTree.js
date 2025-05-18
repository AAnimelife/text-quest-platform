import { Box, Button, Stack, useTheme } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const QuestTree = ({ pages }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const containerRef = useRef(null);
  const svgRef = useRef(null); // 👈 Сохраняем ref на svg

  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const buildTree = (pages) => {
    const pageMap = new Map();
    const childRefs = new Set();

    pages.forEach((page) => {
      pageMap.set(page._id, { ...page, children: [] });
    });

    const buildNode = (id, visited = new Set()) => {
      if (!pageMap.has(id)) return null;
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

      visited.add(id);

      if (node.choices?.length > 0) {
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

    const rootNodes = [];
    pages.forEach((page) => {
      if (!childRefs.has(page._id)) {
        const rootNode = buildNode(page._id);
        if (rootNode) rootNodes.push(rootNode);
      }
    });

    if (rootNodes.length === 0) {
      return pages.map((page) => buildNode(page._id));
    }

    return rootNodes;
  };

  const treeData = buildTree(pages);

  const handleDownloadFullSVG = () => {
    const originalSvg = svgRef.current?.querySelector('svg');
    if (!originalSvg) {
      console.warn('SVG not found');
      return;
    }

    const g = originalSvg.querySelector('g');
    if (!g) {
      console.warn('<g> not found in SVG');
      return;
    }

    const clonedSvg = originalSvg.cloneNode(true);
    clonedSvg.style.filter = 'none';

    const clonedG = clonedSvg.querySelector('g');
    clonedG.removeAttribute('transform');

    // ❌ Удаляем все marker-end
    clonedSvg.querySelectorAll('[marker-end]').forEach(el => {
      el.removeAttribute('marker-end');
    });

    // ❌ Удаляем все <defs> с marker
    clonedSvg.querySelectorAll('defs').forEach(defs => {
      defs.parentNode.removeChild(defs);
    });

    // ✅ Альтернативно: удалить все <path> с определённым классом, если нужны
    // clonedSvg.querySelectorAll('path').forEach(path => {
    //   if (path.getAttribute('marker-end')) {
    //     path.remove();
    //   }
    // });

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.appendChild(clonedSvg);
    document.body.appendChild(tempContainer);

    const bbox = clonedG.getBBox();
    const padding = 100;
    const width = bbox.width + 2 * padding;
    const height = bbox.height + 2 * padding;

    clonedSvg.setAttribute('width', width);
    clonedSvg.setAttribute('height', height);
    clonedSvg.setAttribute(
      'viewBox',
      `${bbox.x - padding} ${bbox.y - padding} ${width} ${height}`
    );

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(clonedSvg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quest-tree-full.svg';
    link.click();
    URL.revokeObjectURL(url);

    document.body.removeChild(tempContainer);
  };


  return (
  <Stack spacing={2}>
    <Button variant="contained" onClick={handleDownloadFullSVG}>
      Скачать полное дерево (SVG)
    </Button>

    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        minHeight: '1500px',
        height: 'auto',
        filter: isDark ? 'invert(1) hue-rotate(180deg)' : 'none',
        overflow: 'auto',
        padding: 2,
      }}
    >
      <div ref={svgRef}>
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: dimensions.width / 2, y: 100 }}
          pathFunc="straight"
          collapsible={false}
          nodeSize={{ x: 300, y: 400 }}
          renderCustomNodeElement={({ nodeDatum }) => (
            <g>
              <circle r="15" fill="#076" />
              <text
                x="20"
                y="5"
                style={{
                  fill: "#111",
                  fontWeight: "bold",
                  strokeWidth: 0,
                }}
              >
                {nodeDatum.title}
              </text>
            </g>
          )}
        />
      </div>
    </Box>
  </Stack>
);
};

export default QuestTree;
