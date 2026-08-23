const TreeEdge = ({ parent, child }) => {
  return (
    <line
      x1={parent.x}
      y1={parent.y + 60}
      x2={child.x}
      y2={child.y}
      stroke="#9CA3AF"
      strokeWidth="2.5"
    />
  );
};

export default TreeEdge;