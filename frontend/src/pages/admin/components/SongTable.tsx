import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash } from "lucide-react";
import React from "react";

const SongTable = () => {
  const { songs, isLoading, error ,deleteSong} = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error} </div>
      </div>
    );
  }
  return (
    <Table className="border-separate border-spacing-0">
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/60">
            <TableCell>
              <img
                src={song.imageUrl}
                alt=""
                className="size-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{song.title} </TableCell>
            <TableCell>{song.artist} </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 ■text-zinc-400">
                <Calendar className="h-4 w-4" />
                {song.createdAt.split("T")[0]}
              </span>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                    <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-200 hover:bg-red-500/50"
                    onClick={()=>deleteSong(song._id)}>
                        <Trash className="size-5"/>
                    </Button>

                </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongTable;
