import { readdir, stat } from "node:fs";
import { join } from "node:path";
import { sum, formatBytes } from "@pureadmin/utils";

/** 递归统计一个目录里所有文件的体积。 */
export class DirectorySize {
  private readonly fileSizes: number[] = [];
  private readonly folder: string;
  private readonly formatAsReadableText: boolean;

  constructor(folder: string, formatAsReadableText: boolean) {
    this.folder = folder;
    this.formatAsReadableText = formatAsReadableText;
  }

  measureTotalSize(onMeasured: (totalSize: string | number) => void): void {
    this.walkDirectory(this.folder, () => {
      const totalSize = sum(this.fileSizes);
      onMeasured(this.formatAsReadableText ? formatBytes(totalSize) : totalSize);
    });
  }

  private walkDirectory(target: string, onFinished: () => void): void {
    readdir(target, (readError, files) => {
      if (readError) throw readError;
      if (files.length === 0) return onFinished();

      let finishedCount = 0;
      const markEntryFinished = () => {
        finishedCount += 1;
        if (finishedCount === files.length) onFinished();
      };

      files.forEach(file => {
        const current = join(target, file);
        stat(current, (statError, stats) => {
          if (statError) throw statError;
          if (stats.isFile()) {
            this.fileSizes.push(stats.size);
            markEntryFinished();
          } else if (stats.isDirectory()) {
            this.walkDirectory(current, markEntryFinished);
          } else {
            markEntryFinished();
          }
        });
      });
    });
  }
}
