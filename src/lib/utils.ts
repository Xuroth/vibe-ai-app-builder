import { TreeItem } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function convertFilesToTreeItems(
  files: { [path: string]:  string }

): TreeItem[] {
  interface TreeNode {
    [key: string]: TreeNode | null;


  }
  console.log("files", files);
  const tree: TreeNode = {};
  const sortedPaths = Object.keys(files).sort();
  
  for (const filePath of sortedPaths) {
    const parts = filePath.split('/');
    console.log("parts", parts);
    let current = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      console.log("part", part);
      if (!current[part]) {
        console.log("current[part]", current[part]);
        current[part] = {};
      }
      console.log("current[part]", part, current[part]);
      current = current[part]
    }

    const fileName = parts[parts.length - 1];
    current[fileName] = null;
    console.log("current", current);
  }

  function convertNode(node: TreeNode, name?: string): TreeItem[] | TreeItem {
    const entries = Object.entries(node);
    if (entries.length === 0) {
      return name || "";
    }
    const children: TreeItem[] = [];

    for (const [key, value] of entries) {
      if (value === null) {
        children.push(key);
      } else {
        const subTree = convertNode(value, key);
        if (Array.isArray(subTree)) {
          children.push([key, ...subTree]);
        } else {
          children.push([key, subTree]);
        }
      }
    }
    return children;
  }

  const result = convertNode(tree);
  return Array.isArray(result) ? result : [result];
}
