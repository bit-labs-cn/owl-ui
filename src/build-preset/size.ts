import { readdir, stat } from "node:fs";
import { sum, formatBytes } from "@pureadmin/utils";

interface PackageSizeOptions {
  folder?: string;
  callback: (value: string | number) => void;
  format?: boolean;
}

/**
 * 递归计算目录体积
 */
export function getPackageSize(options: PackageSizeOptions): void {
  const { folder = "dist", callback, format = true } = options;
  const fileSizes: number[] = [];

  const traverse = (target: string, done: () => void) => {
    readdir(target, (readErr, files) => {
      if (readErr) throw readErr;
      if (files.length === 0) return done();

      let count = 0;
      const checkDone = () => {
        count += 1;
        if (count === files.length) done();
      };

      files.forEach(file => {
        const current = `${target}/${file}`;
        stat(current, (statErr, stats) => {
          if (statErr) throw statErr;
          if (stats.isFile()) {
            fileSizes.push(stats.size);
            checkDone();
          } else if (stats.isDirectory()) {
            traverse(current, checkDone);
          } else {
            checkDone();
          }
        });
      });
    });
  };

  traverse(folder, () => {
    const total = sum(fileSizes);
    callback(format ? formatBytes(total) : total);
  });
}
