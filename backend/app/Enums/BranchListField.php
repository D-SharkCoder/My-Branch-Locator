<?php
namespace App\Enums;

enum BranchListField: string
{
    case Any = 'any';
    case Name = 'name';
    case Manager = 'manager';
    case Address = 'address';
    case Phone = 'phone';
}
