<?php

namespace App\Http\Controllers;

use App\Models\News;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    public function getAllNews()
    {
        return response()->json(News::inRandomOrder()->get());
    }

    public function filterNews(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'q' => 'string', // keywords
            'category' => 'string', // category ids
            'date_from' => 'date', // [ x < publication_date ]
            'date_to' => 'date', // [ publication_date > y ]
            'source' => 'string', // sources ids
        ]);

        if ($validator->fails()) {
            return response($validator->errors()->first(), 400);
        }

        $categoryIds = $request->filled('category') ? explode(",", $request->category) : null;
        $keywords = $request->filled('q') ? explode(" ", $request->q) : null;
        $startDate = $request->filled('date_from') ? Carbon::parse($request->date_from) : null;
        $endDate = $request->filled('date_to') ? Carbon::parse($request->date_to) : null;
        $sourceIds = $request->filled('source') ? explode(",", $request->source) : null;

        $filteredNews = News::when($categoryIds, function ($query) use ($categoryIds) {
            $query->whereHas('category', function ($q) use ($categoryIds) {
                $q->whereIn('id', $categoryIds);
            });
        })
            ->when($keywords, function ($query) use ($keywords) {
                $query->where(function ($q) use ($keywords) {
                    foreach ($keywords as $keyword) {
                        $q->orWhereHas('keywords', function ($innerQ) use ($keyword) {
                            $innerQ->where('name', 'LIKE', '%' . $keyword . '%');
                        });
                    }
                });
            })
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('published_at', [$startDate, $endDate]);
            })
            ->when($sourceIds, function ($query) use ($sourceIds) {
                $query->whereHas('source', function ($q) use ($sourceIds) {
                    $q->whereIn('id', $sourceIds);
                });
            })
            ->get();

        return response()->json($filteredNews);
    }
}
