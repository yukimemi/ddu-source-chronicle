import type { ActionData } from "jsr:@shougo/ddu-kind-file@0.9.0";
import type { Item } from "jsr:@shougo/ddu-vim@10.3.0/types";
import { BaseSource, type GatherArguments } from "jsr:@shougo/ddu-vim@10.3.0/source";
import { z } from "npm:zod@3.24.2";

type Params = {
  kind: string;
};

const kinds = ["read", "write"];

export class Source extends BaseSource<Params> {
  override kind = "file";

  gather(args: GatherArguments<Params>): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        const idx = kinds.indexOf(args.sourceParams.kind);
        const result = await args.denops.call(`chronicle#${kinds.at(idx)}#list`);
        const parsedResult = z.string().array().parse(result);
        controller.enqueue(parsedResult.map((p) => ({
          word: p,
          action: {
            path: p,
          },
        })));
        controller.close();
      },
    });
  }

  params(): Params {
    return {
      kind: "read",
    };
  }
}
