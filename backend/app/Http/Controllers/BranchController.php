<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BranchController extends Controller
{
    public function index()
    {
        return Branch::all();
    }

    public function store(NewBranchRequest $request)
    {
        $branch = Branch::create($request->validated());

        return response()->json($branch, Response::HTTP_CREATED);
    }

    public function show(Branch $branch)
    {
        return $branch;
    }

    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $branch->update($request->validated());

        return response()->json($branch);
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
