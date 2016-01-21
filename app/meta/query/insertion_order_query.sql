SELECT insertion_order_id as value,
       insertion_order_name as label 
FROM (SELECT DISTINCT insertion_order_id,
             insertion_order_id || ' - ' || insertion_order_name AS insertion_order_name
      FROM (insertion_order AS a
        JOIN (SELECT DISTINCT io_id
              FROM advertiser_miq_lookup
              WHERE advertiser_id = {{advertiser_id}}) AS b ON a.insertion_order_id = b.io_id))
ORDER BY insertion_order_id