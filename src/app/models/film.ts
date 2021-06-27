//import{Actor} from './actor';
//import{Genre} from './genre';

import { Actor } from "./actor";
import { Genre } from "./genre";

export interface Film{
id: number;
title: string;
description: string;
plot?: string;
director: string;
duration: string;
release_year: number;
cover_url?: string;
tags: string;
created_by?: number;
created_at?: Date;
actors: Actor[];
genres: Genre[];
vote: number;

}