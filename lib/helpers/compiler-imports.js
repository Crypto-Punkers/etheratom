"use babel";
// Copyright 2018 Etheratom Authors
// This file is part of Etheratom.

// Etheratom is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Etheratom is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Etheratom.  If not, see <http://www.gnu.org/licenses/>.

import { ImportsFsEngine } from "@resolver-engine/imports-fs";

// rollup has a problem with exports, even though they are completely correct
const utils = require("@resolver-engine/imports");
const gatherSources = utils.gatherSources;
// so this is a hack...
// and this function is still in ES proposal as an another method on Object
const objectFromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));


const resolver = ImportsFsEngine();

export async function combineSource(fileRoot, sources) {
    // converting an object into list of its keys, getting a list of results
    // then transforming it back into an object
    let result = await gatherSources(Object.keys(sources), fileRoot, resolver);
    // getting only the file's name
    return objectFromEntries(result.map(res => [res.url.split("/").pop(), {content: res.source}]));
}
