import { BaseSource, Item } from "https://deno.land/x/ddu_vim@v4.1.1/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v4.1.1/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.7.1/file.ts";
import { assert, is, isArrayOf } from "https://deno.land/x/unknownutil@v3.18.1/mod.ts";

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
        assert(result, isArrayOf(is.String));
        controller.enqueue(result.map((p) => ({
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
