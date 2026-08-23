const TreeNode = ({ node, visibleNodes, activeNode }) => {
  if (!visibleNodes.includes(node.id)) {
    return null;
  }

  return (
    <div
      className="absolute transition-all duration-500"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div
        className={`rounded-lg border-2 px-4 py-3 shadow-md whitespace-nowrap transition-all duration-500
        ${
          activeNode === node.id
            ? "border-red-500 bg-red-100"
            : node.state === "done"
              ? "border-green-500 bg-green-100"
              : "border-violet-500 bg-violet-50"
        }`}
      >
        <p className="text-center text-xs font-bold">
          [{node.left}-{node.right}]
        </p>

        <p className="mt-1 text-center text-sm font-semibold">
          {node.values.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default TreeNode;
