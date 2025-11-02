import type { ActionData } from "@shougo/ddu-kind-file";
import type { Item } from "@shougo/ddu-vim/types";
import { BaseSource, type GatherArguments } from "@shougo/ddu-vim/source";
import { z } from "zod";

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
