import TreeNode from "./TreeNode";
import TreeEdge from "./TreeEdge";

const MergeTree = ({
  treeNodes = [],
  visibleNodes = [],
  activeNode,
  treeZoom,
}) => {
  if (treeNodes.length === 0) {
    return (
      <div className="mt-10 rounded-xl border bg-white p-6 text-center">
        <h2 className="text-2xl font-bold">Merge Sort Recursion Tree</h2>

        <p className="mt-4 text-gray-500">
          Click Start to generate the recursion tree.
        </p>
      </div>
    );
  }

  const maxLevel =
    treeNodes.length === 0
      ? 0
      : Math.max(...treeNodes.map((node) => node.level));

  const treeHeight = (maxLevel + 1) * 180 + 120;

  return (
    <div className="mt-10 rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Merge Sort Recursion Tree
      </h2>

      <div className="overflow-auto rounded-xl border bg-gray-50">
        <div
          style={{
            transform: `scale(${treeZoom})`,
            transformOrigin: "top center",
            width: "fit-content",
          }}
        >
          <div
            className="relative"
            style={{
              width: `${Math.max(2200, treeNodes.length * 160)}px`,
              height: `${treeHeight}px`,
            }}
          >
            {/* SVG Lines */}

            <svg className="absolute left-0 top-0" width="100%" height="100%">
              {treeNodes.map((child) => {
                const parent = treeNodes.find(
                  (node) => node.id === child.parent,
                );

                if (
                  !parent ||
                  !visibleNodes.includes(parent.id) ||
                  !visibleNodes.includes(child.id)
                ) {
                  return null;
                }

                return (
                  <TreeEdge key={child.id} parent={parent} child={child} />
                );
              })}
            </svg>

            {/* Nodes */}

            {treeNodes.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                visibleNodes={visibleNodes}
                activeNode={activeNode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeTree;
