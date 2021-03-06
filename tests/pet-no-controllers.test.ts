import got from 'got';
import{strict as assert} from'assert'
import { URLSearchParams } from 'url';

describe('User can',function(){
    it('recive pet by his id', async function () {
        const response = await got('http://93.126.97.71:10080/api/pet/1')
        const body =  JSON.parse(response.body)

        assert(body.id == 1, 'Expected API to return pet with id 1, but got $(body.id)') 
    })

    it('can be received by status', async function () {
        let response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams: { status: 'available' }
        });
        let body = JSON.parse(response.body);
        assert(body.length > 0)

        response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams: { status: 'pending' }
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)

        response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams: { 'status': 'sold' }
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)

        // Multiple statuses are applicable as well
        response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams: new URLSearchParams({ status: ['pending', 'available'] })
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)
        assert(body.some((pet: any) => pet.status == 'available'))
        assert(body.some((pet: any) => pet.status == 'pending'))
        assert(!body.some((pet: any) => pet.status == 'sold'))
    })
    
    it('can be received by tag', async function () {
        const response = await got('http://93.126.97.71:10080/api/pet/findByTags', {
            searchParams: {tags: 'tag1'}
        });
        const body = JSON.parse(response.body);
        assert(body.length > 0)
        assert(body.some(
                (pet: any) => pet.tags.some(
                    (tag: any) => tag.name == 'tag1')
                )
            )
    })
}) 