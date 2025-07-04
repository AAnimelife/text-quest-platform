import { Box, Button, Stack, useTheme } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const QuestTree = ({ pages }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const truncate = (str, max = 20) => str.length > max ? str.slice(0, max) + '…' : str;
 const elbowPath = ({ source, target }) => {
  const radius = 16;
  const dirX = target.x > source.x ? 1 : -1;
  const midY = source.y + (target.y - source.y) / 2;
  if (source.x === target.x) {
    return `M${source.x},${source.y} V${target.y}`;
  }
  return `
    M${source.x},${source.y}
    V${midY - radius}
    A${radius},${radius} 0 0,${dirX > 0 ? 0 : 1} ${source.x + dirX * radius},${midY}
    H${target.x - dirX * radius}
    A${radius},${radius} 0 0,${dirX > 0 ? 1 : 0} ${target.x},${midY + radius}
    V${target.y}
  `;
};

  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const buildForest = (pages) => {
    const pageMap = new Map();
    pages.forEach(page => {
      pageMap.set(page._id, { ...page, children: [] });
    });

    const globalSeen = new Set();
    const nodes = [];

    for (const page of pages) {
      if (!globalSeen.has(page._id)) {
        const rootNode = buildNode(page._id, new Set(), pageMap, globalSeen);
        if (rootNode) nodes.push(rootNode);
      }
    }

    return nodes.filter(Boolean);
  };

  const buildNode = (id, path, pageMap, globalSeen) => {
    if (!pageMap.has(id)) return null;

    const isCycle = path.has(id);
    const isRepeat = globalSeen.has(id);
    globalSeen.add(id);

    const node = pageMap.get(id);
    const newNode = {
      _id: id,
      title: isCycle ? `(loop) ${node.title}` : isRepeat ? `(used) ${node.title}` : node.title,
      children: [],
    };

    if (isCycle || isRepeat) return newNode;

    path.add(id);

    for (const choice of node.choices || []) {
      if (choice.nextPage && pageMap.has(choice.nextPage)) {
        const childNode = buildNode(choice.nextPage, new Set(path), pageMap, globalSeen);
        if (childNode) newNode.children.push(childNode);
      }
    }

    return newNode;
  };

  const treeData = buildForest(pages);

  const handleDownloadFullSVG = () => {
  const originalSvg = svgRef.current?.querySelector('svg');
  if (!originalSvg) return;

  const clonedSvg = originalSvg.cloneNode(true);
  clonedSvg.style.filter = 'none'; // убираем фильтр

  const clonedG = clonedSvg.querySelector('g');
  clonedG.removeAttribute('transform');

  // Добавим фон, чтобы не было прозрачности
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('width', '100%');
  bgRect.setAttribute('height', '100%');
  bgRect.setAttribute('fill', isDark ? 'black' : 'white'); // фон под тему
  clonedSvg.insertBefore(bgRect, clonedSvg.firstChild);

  // Инлайн стили для линий и стрелок
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `
    path {
      stroke: ${isDark ? 'black' : 'black'} !important;
      fill: none !important;
      stroke-width: 3px;
    }
    marker path {
      fill: 'black' !important;
    }
    circle {
      fill: 'black' !important;
    }
    text {
      fill: 'black' !important;
      font-weight: 700;
    }
  `;
  clonedSvg.prepend(style);

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
  clonedSvg.setAttribute('viewBox', `${bbox.x - padding} ${bbox.y - padding} ${width} ${height}`);

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
    <Stack spacing={2} sx={{ height: '100%' }}>
      <Button variant="contained" onClick={handleDownloadFullSVG}>
        Скачать полное дерево (SVG)
      </Button>

      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: '850px',
          filter: isDark ? 'invert(1) hue-rotate(180deg)' : 'none',
          overflow: 'auto',
          padding: 2,
        }}
      >
        <Box ref={svgRef} sx={{ height: '100%' }}>
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: dimensions.width / 2, y: 100 }}
            pathFunc={elbowPath}
            collapsible={true}
            nodeSize={{ x: 350, y: 150 }}
            nodeLabelComponent={null}
            renderCustomNodeElement={({ nodeDatum }) => (
              <g>
                <circle r="15" fill="#076" />
                <text
                  x="20"
                  y="-7"
                  style={{
                    fill: 'black',
                    fontSize: '26px',
                    fontWeight: 700,
                    stroke: 'none',
                  }}
                >
                  <title>{nodeDatum.title}</title>
                  {truncate(nodeDatum.title)}
                </text>

              </g>
            )}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default QuestTree;
