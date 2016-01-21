SELECT campaign_id as value,
       campaign_name as label 
FROM (SELECT a.campaign_id,
             a.campaign_id || ' - ' || b.placement_name AS campaign_name
      FROM ((SELECT DISTINCT campaign_id
             FROM report_campaign_hour
             WHERE advertiser_id = {{advertiser_id}}
             AND   io_id IN ({{insertion_order_id}})
             AND   (pixel_id IN ({{pixel_id}}) OR pixel_id = '0')
             AND   dayserial_numeric >= {{from_dayserial_numeric}}
             AND   dayserial_numeric <= {{to_dayserial_numeric}}
             AND   (target_strategy IN ({{target_strategy}}) OR target_strategy IS NULL)) AS a LEFT JOIN vlookupcampaign AS b ON a.campaign_id = b.campaign_id))
ORDER BY campaign_id;