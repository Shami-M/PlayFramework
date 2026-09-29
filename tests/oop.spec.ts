import {test, expect} from '@playwright/test'
import { studentUserPage } from '../pages/OOP/studentUserPage'
import { practiceUserPaqge } from '../pages/OOP/practiceUserPage';

test.describe('Example for OOP Concepts', async()=>{
test('Login As Student User', async({page})=>{
    const student = new studentUserPage(page);

    await student.login('student@qabrains.com', 'Password123');
    console.log('This is student user');
})

test('Login As Practice User', async({page})=>{
    const practice = new practiceUserPaqge(page);

    await practice.login('practice@qabrains.com', 'Password123');
    console.log('This is Practice user');
})
})