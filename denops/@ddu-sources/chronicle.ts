import { BaseSource, type Denops, Item } from "jsr:@shougo/ddu-vim@5.0.0/types";
import { ActionData } from "jsr:@shougo/ddu-kind-file@0.8.0";
import { z } from "npm:zod@3.23.8";

const kinds = ["read", "write"];

type Params = {
  kind: string;
};

export class Source extends BaseSource<Params> {
  kind = "file";

  gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
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
