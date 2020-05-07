<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Faq extends CI_Controller {

    public function lists()
        {
            $this->load->layout('faq/faq-list');
        }
    public function create()
    	{
    		$this->load->layout('faq/faq-create');
    	}
    public function detail()
        {
            $this->load->layout('faq/faq-detail');
        }
    public function update()
        {
            $this->load->layout('faq/faq-update');
        }

}